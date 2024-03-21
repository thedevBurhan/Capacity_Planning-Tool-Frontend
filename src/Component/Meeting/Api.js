export const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiIyN2MyYWU2Yy02ZGRjLTQxMGItODBkNi03NzdlZDVkMzlhNzAiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcxMDk0NTM1NCwiZXhwIjoxNzI2NDk3MzU0fQ.7zJmgrg7309sTNu7h08LKfQDUFO126MWtETn2bTM9XU";

// API call to create meeting
export const createMeeting = async ({ token }) => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      authorization: `${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });

  const { roomId } = await res.json();
  return roomId;
};