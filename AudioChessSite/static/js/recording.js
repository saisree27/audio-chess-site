navigator.mediaDevices.getUserMedia({
    video: false,
    audio: true
}).then(async function(stream) {
    let recorder = RecordRTC(stream, {
        type: 'audio'
    });
    recorder.startRecording();


    window.setInterval(function() {
        recorder.pauseRecording();
        let blob = recorder.getBlob();
        invokeSaveAsDialog(blob);
        recorder.resumeRecording();
    }, 5000);
    // const sleep = m => new Promise(r => setTimeout(r, m));
    // await sleep(10000);

    // recorder.stopRecording(function() {
    //     let blob = recorder.getBlob();
    //     invokeSaveAsDialog(blob);
    // });
});