navigator.mediaDevices.getUserMedia({
    video: false,
    audio: true
}).then(async function(stream) {
    let recorder = RecordRTC(stream, {
        type: 'audio'
    });
    recorder.startRecording();


    // window.setInterval(function() {
    //     recorder.pauseRecording();
    //     let blob = recorder.getBlob();
    //     invokeSaveAsDialog(blob);
    //     recorder.resumeRecording();
    // }, 5000);
    const sleep = m => new Promise(r => setTimeout(r, m));
    await sleep(15000);

    recorder.stopRecording(function() {
        let blob = recorder.getBlob();
        invokeSaveAsDialog(blob);
        
        var csrfToken = '{{ csrf_token }}';
        console.log(csrfToken);
        let fd = new FormData;
        fd.append("audioRecording", blob);
        fd.append("csrfmiddlewaretoken", csrfToken);
        fetch("/upload", {method:"POST", body:fd})
        .then(response => response.ok)
        .then(res => console.log(res))
        .catch(err => console.error(err));
    });
});