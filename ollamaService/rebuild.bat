cd C:\Users\crossfire234\Desktop\Software\LLMs\OllamaLangChain\ollamaService
REM && docker run -p 3000:3000 langchainjs-app (if you want to run it like this)
docker build --cache-from langchainjs-app:tag -t langchainjs-app:tag . 
PAUSE