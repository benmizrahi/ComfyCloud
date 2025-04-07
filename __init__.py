import server
from aiohttp import web
import os

# Get the ComfyUI server instance
PromptServer = server.PromptServer.instance

# Define the function that will run when the button is clicked
async def handle_cloud_action(request):
    
    print("My Cloud Button was clicked!")

    request.json = await request.json()
    print(request.json)
    
    # save the json to file 
    with open('cloud.json', 'w') as f:
        f.write(str(request.json))

    # Return a response to the frontend (optional, but good practice)
    return web.json_response({"status": "success", "message": "Done!"})

# Define a new API route for our button action
# The route path '/my-button-action' must match the path used in the JavaScript fetch request
@PromptServer.routes.post('/cloud-handler-action')
async def cloud_handler(request):
    return await handle_cloud_action(request)

# --- Standard ComfyUI Extension Boilerplate ---

# A dictionary that ComfyUI uses to map node class names to node objects
NODE_CLASS_MAPPINGS = {}

# A dictionary that ComfyUI uses to map node class names to display names
NODE_DISPLAY_NAME_MAPPINGS = {}

# Tell ComfyUI where to serve the JavaScript file from
WEB_DIRECTORY = "js"

print("### Loading: My Button Extension")