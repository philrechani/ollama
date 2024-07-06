import { Ollama } from "@langchain/community/llms/ollama";
const OLLAMA_SERVICE_URL = 'http://host.docker.internal:11434';

const ollama = new Ollama({
  baseUrl: OLLAMA_SERVICE_URL,
  model: "mistral",
});

const answer = await ollama.invoke(`why is the sky blue?`);

console.log(answer);

import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";

const loader = new CheerioWebBaseLoader("https://en.wikipedia.org/wiki/2023_Hawaii_wildfires");
const data = await loader.load();

import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import "@tensorflow/tfjs-node";
import { TensorFlowEmbeddings } from "@langchain/community/embeddings/tensorflow";

// Split the text into 500 character chunks. And overlap each chunk by 20 characters
const textSplitter = new RecursiveCharacterTextSplitter({
 chunkSize: 500,
 chunkOverlap: 20
});
const splitDocs = await textSplitter.splitDocuments(data);

// Then use the TensorFlow Embedding to store these chunks in the datastore
const vectorStore = await MemoryVectorStore.fromDocuments(splitDocs, new TensorFlowEmbeddings());

import { RetrievalQAChain } from "langchain/chains";

const retriever = vectorStore.asRetriever();
const chain = RetrievalQAChain.fromLLM(ollama, retriever);
const result = await chain.call({query: "When was Hawaii's request for a major disaster declaration approved?"});
console.log(result.text)