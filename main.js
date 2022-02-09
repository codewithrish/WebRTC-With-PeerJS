let localVideo = document.getElementById("local-video");
let remoteVideo = document.getElementById("remote-video");

// Video and audio are enabled for this call.

let peer, localStream;
let MediaConfigurtion = {
  audio: true,
  video: true,
};

// Initialize peer object with userId

function init(userId) {
  peer = new Peer(userId);
  peer.on("open", () => {
    console.log(`user connected with userID = ${userId}`);
  });
  listenCall();
}

// Get the user media (camera and microphone) for the call.

function makeCall(friendId) {
  var getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;
  getUserMedia(MediaConfigurtion, (stream) => {
    localVideo.srcObject = stream;
    localStream = stream;

    const call = peer.call(friendId, stream);
    call.on("stream", (remoteStream) => {
      remoteVideo.srcObject = remoteStream;
    });
  });
}

// navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

function listenCall() {
  var getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;
  peer.on("call", (call) => {
    getUserMedia(MediaConfigurtion, (stream) => {
      localVideo.srcObject = stream;
      locaStream = stream;
      call.answer(stream);
      call.on("stream", (remoteStream) => {
        remoteVideo.srcObject = remoteStream;
      });
    });
  });
}

// Call init with random UUID
init(getUID());

// generate a random UUID string.
function getUID() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}
