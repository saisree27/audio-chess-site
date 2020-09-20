function TicTacToe(ai) {
	
	// drawing variables
	this.superFatPencil = new PencilFuzzy(12,10);
	this.fatPencil = new PencilFuzzy(8,7);
	this.thinPencil = new PencilFuzzy(4,3);
	this.paper = new Paper({id : 'board', pencil : this.thinPencil });
	this.paper.setColor(new Color(48, 48, 48));
	
	// game variables
	this.turn = 1;
	
	this.gameOver = false;
	
	// the next board that the player has to play in, i.e. [0,0] = top left square
	this.nextBoard = null; //[1,1]; 
	
	this.useAI = false;
	
	this.ai = ai;
	
	this.state = 	
	[
		[[[0,0,0],[0,0,0],[0,0,0]], [[0,0,0],[0,0,0],[0,0,0]], [[0,0,0],[0,0,0],[0,0,0]]],
		[[[0,0,0],[0,0,0],[0,0,0]], [[0,0,0],[0,0,0],[0,0,0]], [[0,0,0],[0,0,0],[0,0,0]]],
		[[[0,0,0],[0,0,0],[0,0,0]], [[0,0,0],[0,0,0],[0,0,0]], [[0,0,0],[0,0,0],[0,0,0]]]
	];
	
	this.wins = [[0,0,0],[0,0,0],[0,0,0]];
	
	this.drawBoard = function() {
		var w = $("#board").width();
		var h = $("#board").height();
		
		// main board
		this.paper.pencil = this.fatPencil;
		this.paper.setColor(new Color(48, 48, 48));
		this.paper.line4f(0+2, h/3-3, w-8, h/3-3);
		this.paper.line4f(0+2, 2/3*h-3, w-8, 2/3*h-3);
		this.paper.line4f(w/3-3, 0+2, w/3-3, h-8);
		this.paper.line4f(2/3*w-3, 0+2, 2/3*w-3, h-8);
		
		// sub board
		this.paper.pencil = this.thinPencil;
		this.drawSubBoard(0, 0); this.drawSubBoard(w/3, 0); this.drawSubBoard(2/3*w, 0);
		this.drawSubBoard(0, h/3); this.drawSubBoard(w/3, h/3); this.drawSubBoard(2/3*w, h/3);
		this.drawSubBoard(0, 2/3*h); this.drawSubBoard(w/3, 2/3*h); this.drawSubBoard(2/3*w, 2/3*h);
		
		// border
		this.paper.pencil = this.fatPencil;
		this.paper.setColor(new Color(139, 69, 19));
		this.paper.line4f(-2, -2, w-2, -2);
		this.paper.line4f(w-4, -2, w-4, h-4);
		this.paper.line4f(-2, h-4, w-4, h-4);
		this.paper.line4f(-2, -2, -2, h-4);
		
		this.paper.pencil = this.thinPencil;
	}
	
	this.drawSubBoard = function(x, y) {
		var w = $("#board").width() / 3;
		var h = $("#board").height() / 3
		this.paper.setColor(new Color(60, 60, 60));
		this.paper.line4f(x + 8, y + h/3, x + w-12, y + h/3);
		this.paper.line4f(x + 8, y + 2/3*h, x + w-12, y + 2/3*h);
		this.paper.line4f(x + w/3, y + 8, x + w/3, y + h-12);
		this.paper.line4f(x + 2/3*w, y + 8, x + 2/3*w, y + h-12);
	}
	
	this.getCurrentSubBoard = function() {
		return this.state[this.nextBoard[0]][this.nextBoard[1]];
	}
	
	this.isSubBoardFull = function(board) {
		if(board == null) {
			return false;
		}
		return board[0][0] != 0 && board[1][0] != 0 && board[2][0] != 0
			&& board[0][1] != 0 && board[1][1] != 0 && board[2][1] != 0
			&& board[0][2] != 0 && board[1][2] != 0 && board[2][2] != 0
	}
	
	this.switchTurns = function() {
		if(this.turn == 2) {
			this.turn = 1;
			$("#turn").html("X");
		} else if(this.turn == 1) {
			this.turn = 2;
			$("#turn").html("O");
		}
	}
	
	this.clickedValidBoard = function(x, y) {
		if(this.nextBoard == null) {
			return true;
		}
		var w = $("#board").width();
		var h = $("#board").height();
		
		if(x > this.nextBoard[0]*w/3 
			&& x < (this.nextBoard[0]+1)*w/3
			&& y > this.nextBoard[1]*h/3 
			&& y < (this.nextBoard[1]+1)*h/3) {
			return true;
		}
		return false;
	}

	this.getLocalCoord = function(x, y) {
		var w = $("#board").width() / 3;
		var h = $("#board").height() / 3;
		// Current Board
		if(this.nextBoard == null) {
			this.nextBoard = [
				parseInt(x / w),
				parseInt(y / h)
			];
		}

		var x0 = this.nextBoard[0]*w;
		var y0 = this.nextBoard[1]*h;
		var lx = parseInt((x-x0) / w * 3);
		console.log(x-x0)
		var ly = parseInt((y-y0) / h * 3);
		console.log(y-y0)
		return [lx, ly];
	}

	this.parseVoiceInput = function(input) {
		var xVoice;
		var yVoice;

		// Finds Next Board from Input
		if (input.includes('top left')) this.message = 'topleft';
		if (input.includes('top middle')) this.message = 'topmiddle';
		if (input.includes('top right')) this.message = 'topbottom';
		if (input.includes('center left')) this.message = 'centerleft';
		if (input.includes('center middle')) this.message = 'centermiddle';
		if (input.includes('center right')) this.message = 'centerright';
		if (input.includes('bottom left')) this.message = 'bottomleft';
		if (input.includes('bottom middle')) this.message = 'bottommiddle';
		if (input.includes('bottom right')) this.message = 'bottomright';

		if ((this.message) === 'topleft') {
			console.log(this.message)
			console.log(this.state)
			xVoice = 35;
			yVoice = 35;
			this.go(xVoice, yVoice);
			return true;
		}
		if ((this.message) === 'topmiddle') {
			xVoice = 35;
			yVoice = 35;
		}
		if ((this.message) === 'topbottom') {
			xVoice = 35;
			yVoice = 35;
		}
		if ((this.message) === 'centerleft') {
			xVoice = 35;
			yVoice = 35;
		}
		if ((this.message) === 'centermiddle') {
			xVoice = 35;
			yVoice = 35;
		}
		if ((this.message) === 'centerright') {
			xVoice = 35;
			yVoice = 35;
		}
		if ((this.message) === 'bottomleft') {
			xVoice = 35;
			yVoice = 35;
		}
		if ((this.message) === 'bottommiddle') {
			xVoice = 35;
			yVoice = 35;
		}
		if ((this.message) === 'bottomright') {
			xVoice = 35;
			yVoice = 35;
		}
		return true;
	}
	
	this.clickedEmptySpace = function(x, y) {
		var lxy = this.getLocalCoord(x, y);
		var lx = lxy[0];
		var ly = lxy[1];
		
		// alert(lx + " " + ly + " " + this.state[this.nextBoard[0]][this.nextBoard[1]][lx][ly]);
		if(this.state[this.nextBoard[0]][this.nextBoard[1]][lx][ly] == 0) {
			return true;
		}
		return false;
	}
	
	this.drawO = function(x, y) {
		var w = $("#board").width() / 3 / 3;
		this.paper.setColor(new Color(128,0, 0));
		this.paper.circle(x + w/2 + 2, y + w/2 + 2, w / 2 - 10, false, 5);
	}
	
	this.drawX = function(x, y) {
		var w = $("#board").width() / 3 / 3;
		var h = $("#board").height() / 3 / 3;
		this.paper.setColor(new Color(0,128,0));
		this.paper.line4f(x+9, y+9, x+w-9, y+h-9);
		this.paper.line4f(x+w-9, y+9, x+9, y+h-9);
	}
	
	this.go = function(lx, ly) {
		this.state[this.nextBoard[0]][this.nextBoard[1]][lx][ly] = this.turn;
		var w = $("#board").width() / 3;
		var h = $("#board").height() / 3;
		
		var dX = this.nextBoard[0] * w + lx * w / 3;
		var dY = this.nextBoard[1] * h + ly * h / 3;
		if(this.turn == 2) {
			this.drawO(dX, dY);
		} else if(this.turn == 1) {
			this.drawX(dX, dY);
		}
		this.handleWins(this.nextBoard[0], this.nextBoard[1], 1);
		this.handleWins(this.nextBoard[0], this.nextBoard[1], 2);
		// Next Board
		this.nextBoard = [lx, ly];
	}
	
	
	this.highlightBoard = function() {
		var w = $("#board").width() / 3;
		var h = $("#board").height() / 3;
		if(this.nextBoard == null) {
			$("#board").css("background-repeat", "repeat");
			$("#board").css("background-position", "0px 0px");
		} else {
			var pos = (this.nextBoard[0]*w) + "px " + (this.nextBoard[1]*h) + "px";
			$("#board").css("background-repeat", "no-repeat");
			$("#board").css("background-position", pos);
		}
	}
	
	this.handleWins = function(x, y, turn) {
		var w = $("#board").width() / 3;
		var h = $("#board").height() / 3;
		var dX = this.nextBoard[0] * w;
		var dY = this.nextBoard[1] * h;
		
		var board = this.state[x][y];
		if(this.wins[x][y] > 0) {
			return;
		}
		
		// local wins
		// horizontal
		if(turn == 1) {
			this.paper.setColor(new Color(0,128,0));
		} else if(turn == 2) {
			this.paper.setColor(new Color(128,0,0));
		}
		this.paper.pencil = this.fatPencil;
		if(board[0][0] == turn && board[1][0] == turn && board[2][0] == turn) {
			this.paper.line4f(dX+8, dY + h/3/2-4, dX + w-8, dY + h/3/2-4);
			this.wins[x][y] = turn;
		}
		if(board[0][1] == turn && board[1][1] == turn && board[2][1] == turn) {
			this.paper.line4f(dX+8, dY + (h/3/2+h/3)-4, dX + w-8, dY + (h/3/2+h/3)-4);
			this.wins[x][y] = turn;
		}
		if(board[0][2] == turn && board[1][2] == turn && board[2][2] == turn) {
			this.paper.line4f(dX+8, dY + (h/3/2+2/3*h)-4, dX + w-8, dY + (h/3/2+2/3*h)-4);
			this.wins[x][y] = turn;
		}
		// vertical
		if(board[0][0] == turn && board[0][1] == turn && board[0][2] == turn) {
			this.paper.line4f(dX+w/3/2-4, dY+8, dX+w/3/2-4, dY+h-8);
			this.wins[x][y] = turn;
		}
		if(board[1][0] == turn && board[1][1] == turn && board[1][2] == turn) {
			this.paper.line4f(dX+(w/3/2+w/3)-4, dY+8, dX+(w/3/2+w/3)-4, dY+h-8);
			this.wins[x][y] = turn;
		}
		if(board[2][0] == turn && board[2][1] == turn && board[2][2] == turn) {
			this.paper.line4f(dX+(w/3/2+2/3*w)-4, dY+8, dX+(w/3/2+2/3*w)-4, dY+h-8);
			this.wins[x][y] = turn;
		}
		// diagonal
		if(board[0][0] == turn && board[1][1] == turn && board[2][2] == turn) {
			this.paper.line4f(dX+8, dY+8, dX+w-8, dY+h-8);
			this.wins[x][y] = turn;
		}
		if(board[2][0] == turn && board[1][1] == turn && board[0][2] == turn) {
			this.paper.line4f(dX+8, dY+h-8, dX+w-8, dY-8);
			this.wins[x][y] = turn;
		}
		
		if(this.wins[x][y] > 0) {
			$("#score_" + turn).html(parseInt($("#score_" + turn).html()) + 1);
		}
		
		// global wins
		// horizontal
		this.paper.pencil = this.superFatPencil;
		if(this.hasWon(turn)) {
			if(turn == 2) {
				alert("O Wins!");
				$("#msg").html("O Wins!");
				this.gameOver = true;
			} else if(turn == 1) {
				alert("X Wins!");
				$("#msg").html("X Wins!");
				this.gameOver = true;
			}
		}
		this.paper.pencil = this.thinPencil;
	}
	
	this.hasWon = function(turn) {
		if((this.wins[0][0] == turn && this.wins[1][0] == turn && this.wins[2][0] == turn)
		  || (this.wins[0][1] == turn && this.wins[1][1] == turn && this.wins[2][1] == turn) 
	      || (this.wins[0][2] == turn && this.wins[1][2] == turn && this.wins[2][2] == turn)
		  || (this.wins[0][0] == turn && this.wins[0][1] == turn && this.wins[0][2] == turn)
	      || (this.wins[1][0] == turn && this.wins[1][1] == turn && this.wins[1][2] == turn)
		  || (this.wins[2][0] == turn && this.wins[2][1] == turn && this.wins[2][2] == turn) 
	      || (this.wins[0][0] == turn && this.wins[1][1] == turn && this.wins[2][2] == turn)
		  || (this.wins[2][0] == turn && this.wins[1][1] == turn && this.wins[0][2] == turn)) {
		  return true;
		}
		return false;
	}
	
	this.move = function(x, y) {
		if(this.clickedValidBoard(x, y)) {
			if(this.clickedEmptySpace(x, y)) {
				var lxy = this.getLocalCoord(x, y);
				var lx = lxy[0];
				var ly = lxy[1];
				this.go(lx, ly);
				return true;
			} else {
				$("#msg").html("That space is already been played!");
			}
		} else {
			$("#msg").html("Must make a move in board (" + (this.nextBoard[0] + 1) + ", " + (this.nextBoard[1] + 1) + ")");
		}
		return false;
	} 
	
	this.toggleAI = function() {
		this.useAI = !this.useAI;
		if(this.useAI) {
			$("#toggle_ai").attr("value", "A.I.");
		} else {
			$("#toggle_ai").attr("value", "Human");
		}
	}

	this.aiGo = function() {
		var move = this.ai.solve(this);
		this.nextBoard = [move[0], move[1]];
		this.go(move[2], move[3]);

		if(!this.gameOver) {
			$("#msg").html("");
		}
		this.switchTurns();		
		// account for filled squares
		if(this.nextBoard != null && this.isSubBoardFull(this.getCurrentSubBoard())) {
			this.nextBoard = null;
		}
		this.highlightBoard();
	}

	this.handleInput = function(x, y) {
		if(!this.gameOver) {
			var moved = this.move(x, y);
			if(moved) {
				// account for filled squares
				if(this.nextBoard != null && this.isSubBoardFull(this.getCurrentSubBoard())) {
					this.nextBoard = null;
				}
				this.highlightBoard();
				if(!this.gameOver) {
					$("#msg").html("");
				}
				this.switchTurns();
				if(this.useAI && !this.gameOver) {
					this.aiGo();
				}
			}
		}
	}

	this.handleClick = function(e) {
		var offset = $("#board").offset();
		var x = e.clientX - offset.left + $(window).scrollLeft();
		var y = e.clientY - offset.top + $(window).scrollTop();

		this.handleInput(x, y);
	}	

	$("#msg").html("Start by clicking anywhere :)");

	// handle click/touch events
	var board = this;
	$("#board").click(function(e) {
		board.handleClick(e);
	});
	$("#board").bind("touchstart", function(e) {
		var targetEvent =  e.touches.item(0);
		board.handleClick(targetEvent);
	});
	
}

/**
 * Begins a stream with rev.ai using the AudioContext from the browser. Stream will continue until the websocket 
 * connection is closed. Follows the protocol specficied in our documentation:
 * https://www.rev.ai/docs/streaming
 */
function doStream() {
    statusElement = document.getElementById("status");
    tableElement = document.getElementById("messages");
    finalsReceived = 0;
    currentCell = null;
    audioContext = new (window.AudioContext || window.WebkitAudioContext)();

    const access_token = '02hKmT-jKjN1Hg0zKbUlqNQfQxXw5xQinU38K69uVaQjYKRtrIYUBoU2rb9YdyEuM7ITkfuxP1xvxR1NgIE1gunjfZe7s';
    const custom_vocab_id = 'cvut4JlOBZ5ofT'
    const content_type = `audio/x-raw;layout=interleaved;rate=${audioContext.sampleRate};format=S16LE;channels=1`;
    const baseUrl = 'wss://api.rev.ai/speechtotext/v1alpha/stream';
    const query = `access_token=${access_token}&content_type=${content_type}&custom_vocabulary_id=${custom_vocab_id}`;
    websocket = new WebSocket(`${baseUrl}?${query}`);

    websocket.onopen = onOpen;
    websocket.onclose = onClose;
    websocket.onmessage = onMessage;
    websocket.onerror = console.error;
}

/**
 * Gracefully ends the streaming connection with rev.ai. Signals and end of stream before closing and closes the 
 * browser's AudioContext
 */
function endStream() {
    if (websocket) {
        websocket.send("EOS");
        websocket.close();
    }
    if (audioContext) {
        audioContext.close();
    }
}

/**
 * Updates the display and creates the link from the AudioContext and the websocket connection to rev.ai
 * @param {Event} event 
 */
function onOpen(event) {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((micStream) => {
        audioContext.suspend();
        var scriptNode = audioContext.createScriptProcessor(4096, 1, 1 );
        var input = input = audioContext.createMediaStreamSource(micStream);
        scriptNode.addEventListener('audioprocess', (event) => processAudioEvent(event));
        input.connect(scriptNode);
        scriptNode.connect(audioContext.destination);
        audioContext.resume();
    });
}

/**
 * Displays the close reason and code on the webpage
 * @param {CloseEvent} event
 */
function onClose(event) {
}

/**
 * Handles messages received from the API according to our protocol
 * https://www.rev.ai/docs/streaming#section/Rev.ai-to-Client-Response
 * @param {MessageEvent} event
 */
function onMessage(event) {
    var data = JSON.parse(event.data);
    switch (data.type){
        case "connected":
            console.log(`Connected, job id is ${data.id}`);
            break;
        case "partial":
            break;
        case "final":
            message = parseResponse(data);
            if (data.type == "final"){
				ttt.parseVoiceInput(message.toLowerCase())
            }
            break;
        default:
            // We expect all messages from the API to be one of these types
            console.error("Received unexpected message");
            break;
    }
}

/**
 * Transform an audio processing event into a form suitable to be sent to the API. (S16LE or Signed 16 bit Little Edian).
 * Then send.
 * @param {AudioProcessingEvent} e 
 */
function processAudioEvent(e) {
    if (audioContext.state === 'suspended' || audioContext.state === 'closed' || !websocket) {
        return;
    }

    let inputData = e.inputBuffer.getChannelData(0);

    // The samples are floats in range [-1, 1]. Convert to PCM16le.
    let output = new DataView(new ArrayBuffer(inputData.length * 2));
    for (let i = 0; i < inputData.length; i++) {
        let multiplier = inputData[i] < 0 ? 0x8000 : 0x7fff; // 16-bit signed range is -32768 to 32767
        output.setInt16(i * 2, inputData[i] * multiplier | 0, true); // index, value, little edian
    }

    let intData = new Int16Array(output.buffer);
    let index = intData.length;
    while (index-- && intData[index] === 0 && index > 0) { }
    websocket.send(intData.slice(0, index + 1));
}

function parseResponse(response) {
    var message = "";
    for (var i = 0; i < response.elements.length; i++){
        message += response.type == "final" ?  response.elements[i].value : `${response.elements[i].value} `;
    }
    return message;
}