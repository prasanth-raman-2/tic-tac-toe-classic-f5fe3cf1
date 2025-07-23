#!/bin/bash
cd /tmp/kavia/workspace/code-generation/tic-tac-toe-classic-f5fe3cf1/tic_tac_toe_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

