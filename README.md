# syntheawrangler
Personal project to develop Hospitalrun test files. Will be merged into HR project when appropriate.

Once you have a file, you can put in into a local couchdb instance with a command similar to:
curl -d @patients.json -H "Content-type: application/json" -X POST http://127.0.0.1:5984/patients/_bulk_docs
