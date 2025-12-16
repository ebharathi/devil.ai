from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from routes import router
from middleware.logging_filter import setup_tool_calls_log_filter

# Load env
load_dotenv()

# Setup logging filter to suppress tool-calls endpoint logs
setup_tool_calls_log_filter()

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:56789",
        "http://127.0.0.1:56789",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)
