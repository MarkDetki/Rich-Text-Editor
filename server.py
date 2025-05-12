from flask import Flask, request, send_from_directory, Response, abort
import requests
from urllib.parse import urljoin, urlencode
import os

app = Flask(__name__, static_folder="dist/assets")

FLASK_PORT = int(os.getenv("FLASK_PORT", 8080))
ZETTELSTORE_PORT = int(os.getenv("ZETTELSTORE_PORT", 23123))
ZETTELSTORE_API = f"http://localhost:{ZETTELSTORE_PORT}"

# Use a global session for connection pooling
session = requests.Session()

@app.route('/api/<path:path>', methods=['GET'])
def proxy(path):
    """
    Proxy API requests to the Zettelstore API.
    Handles streaming of responses and connection pooling for performance.
    """
    query_string = urlencode(request.args)
    proxy_url = f"{urljoin(ZETTELSTORE_API, path)}?{query_string}"

    try:
        # Send request to backend API with streaming enabled
        response = session.get(proxy_url, headers=request.headers, stream=True, timeout=2)

        # Stream response content back to the client
        return Response(response.raw, status=response.status_code, headers=response.headers)
    except requests.RequestException as e:
        abort(502, description=f"Bad Gateway: {str(e)}")

@app.route('/<path:path>', methods=['GET'])
def serve_static(path):
    return send_from_directory(app.static_folder, path)

@app.route('/', methods=['GET'])
def serve_index():
    return send_from_directory("dist", 'index.html')

if __name__ == '__main__':
    app.run(port=FLASK_PORT)
