import http from "k6/http";

export let options = {
    vus: 5,
    stages: [
        { duration: "10m", target: 10 },
        { duration: "5m", target: 10 },
        { duration: "10m", target: 20 },
        { duration: "1m30s", target: 0 },
    ]
};

export default function() {
    let response0 = http.get("http://localhost:3001");
    // console.log(response0.status);
    let response1 = http.get("http://localhost:3001/getDataForOneSong");
    // console.log(response1.status);
    let response2 = http.post("http://localhost:3001/postComment");
    // console.log(response2.status);
};