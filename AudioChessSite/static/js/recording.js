navigator.mediaDevices.getUserMedia({
    video: false,
    audio: true
}).then(async function (stream) {
    let recorder = RecordRTC(stream, {
        type: 'audio/webm'
    });
    recorder.startRecording();


    // window.setInterval(function() {
    //     recorder.pauseRecording();
    //     let blob = recorder.getBlob();
    //     invokeSaveAsDialog(blob);
    //     recorder.resumeRecording();
    // }, 5000);
    const sleep = m => new Promise(r => setTimeout(r, m));
    await sleep(5000);

    recorder.stopRecording(function () {
        let blob = recorder.getBlob();
        console.log(blob);
        console.log(recorder);
        // invokeSaveAsDialog(blob);

        // var xhr = new XMLHttpRequest();
        // var yourUrl = "https://api.us-south.speech-to-text.watson.cloud.ibm.com/instances/1be94588-c125-4a3c-b119-4e202d2b1d50/v1/recognize";
        // xhr.open("POST", yourUrl, true);
        // xhr.setRequestHeader('Content-Type', 'application/json');
        // xhr.send(JSON.stringify({
        //     value: value
        // }));
        // xhr.

        // var csrfToken = '{{ csrf_token }}';
        // console.log(csrfToken);
        // let fd = new FormData;
        // fd.append("audioRecording", blob);
        // fd.append("csrfmiddlewaretoken", csrfToken);
        // fetch("/upload", {method:"POST", body:fd})
        // .then(response => response.ok)
        // .then(res => console.log(res))
        // .catch(err => console.error(err));
    });
});