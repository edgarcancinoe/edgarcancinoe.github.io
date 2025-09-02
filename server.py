#!/usr/bin/env python3
"""
Simple HTTP server for local development of the portfolio.
Compatible with GitHub Pages deployment.
"""

import http.server
import socketserver
import os
import webbrowser
from pathlib import Path

PORT = 8000

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def main():
    # Change to the directory containing this script
    os.chdir(Path(__file__).parent)
    
    with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
        print(f"Portfolio server running at http://localhost:{PORT}")
        print(f"Open http://localhost:{PORT}/index_new.html to view the new layout")
        print(f"Open http://localhost:{PORT}/projects_new.html to view the projects page")
        print("Press Ctrl+C to stop the server")
        
        # Automatically open browser
        webbrowser.open(f'http://localhost:{PORT}/index_new.html')
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")

if __name__ == "__main__":
    main()
