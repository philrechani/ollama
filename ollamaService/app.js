import { Ollama } from "@langchain/community/llms/ollama";
import { vectorStore } from "./sites.js";
const OLLAMA_SERVICE_URL = 'http://host.docker.internal:11434';

const ollama = new Ollama({
  baseUrl: OLLAMA_SERVICE_URL,
  model: "mistral",
});

//const answer = await ollama.invoke(`why is the sky blue?`);
//console.log(answer);


//update later
import { RetrievalQAChain } from "langchain/chains";

const retriever = vectorStore.asRetriever();
const chain = RetrievalQAChain.fromLLM(ollama, retriever);
const result = await chain.call({query: "When was Hawaii's request for a major disaster declaration approved?"});
console.log(result.text)