
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

const documents = [...your documents here];
const embeddings = ...your embeddings model;
const llm = ...your LLM model;

const vectorstore = await MemoryVectorStore.fromDocuments(
  documents,
  embeddings
);
const prompt = ChatPromptTemplate.fromTemplate(`Answer the user's question: {input}`);

const combineDocsChain = await createStuffDocumentsChain({
  llm,
  prompt,
});
const retriever = vectorstore.asRetriever();

const retrievalChain = await createRetrievalChain({
  combineDocsChain,
  retriever,
});