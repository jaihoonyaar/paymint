from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings

# Load embedding model
embedding_model = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

# Global store
vector_store = None


def load_documents():
    loader = PyPDFLoader("data/docs/cashback_policy.pdf")
    docs = loader.load()

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50
    )

    chunks = splitter.split_documents(docs)
    return chunks


def create_vector_store():
    global vector_store
    print("🔥 Creating vector store...")   # ADD THIS
    chunks = load_documents()
    vector_store = FAISS.from_documents(chunks, embedding_model)
    print("✅ Vector store ready")


def query_rag(query):
    global vector_store

    docs = vector_store.similarity_search(query, k=3)
    return "\n\n".join([doc.page_content for doc in docs])