/*
/queue
Post:
Kriegt: UserID
Bekommt: RoomId und ProblemId wenn raum gefunden sonst nichts 

Get:
Anfragen ob schon raum gefunden
Bekommt: RoomId und ProblemId oder nichts

/battle
Post:
Kriegt: Submission aus Ausführzeit, Speicher, Status (Accepted, Denied), Array aus booleans für test cases
Bekommt:  wenn 2 submission eingereicht wurden ergebnis wer gewonnen hat und wieso vllt? (Mehr testcases oder bessere zeit oder speicher)

Get:
Anfragen ob schon ergebnis gibt
Bekommt: Ergebnis oder nichts
*/

import axiosInstance from "./axiosInstance";

interface MatchSubmission {
    calculationTimeMs: number;
    memoryUsageKb: number;
    result: string;
    testResults: boolean[];
}

interface Match {
    roomId: string;
    problemId: string;
}

export async function queue(userId: string): Promise<Match | null> {
    const res = await axiosInstance.post(`/match/queue/${userId}`);
    return res.data;
}

export async function pollQueue(userId: string): Promise<Match | null> {
    const res = await axiosInstance.get(`/match/queue/${userId}`);
    return res.data;
}

export async function sendMatchData(userId: string, roomId: string, submission: MatchSubmission): Promise<boolean | null> {
    console.log("sending match data:",submission);
    // const res = await axiosInstance.post(`/match/battle/${userId}/${roomId}`, submission);
    return null;
}

export async function pollMatch(userId: string, roomId: string): Promise<boolean | null> {
    // const res = await axiosInstance.get(`/match/battle/${userId}/${roomId}`);
    return true;
}
