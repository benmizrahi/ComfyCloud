import json
import google.auth
import fastapi
import uvicorn
from urllib import request
from google.auth.transport.requests import Request



def get_id_token():
    credentials, _ = google.auth.default()
    credentials.refresh(Request())
    id_token = credentials._id_token
    return id_token

app = fastapi.FastAPI()

@app.post("/api/cloud")
def read_root(req):
    try:
        data = req.json()
        data = json.dumps(data['workflow']).encode('utf-8')
        
        req = request.Request("http://localhost:8188/prompt",method="GET",data=data)
        req.add_header('Content-Type', 'application/json')
        
        with request.urlopen(req) as response:
            response_data = response.read()
            print(response_data.decode('utf-8'))
        
        return {"message": "Done"}
    except Exception as e:
        return {"error": str(e)}
    

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)