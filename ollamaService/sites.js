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
export const vectorStore = await MemoryVectorStore.fromDocuments(splitDocs, new TensorFlowEmbeddings());