# AI-Powered Java Bug Detector

## Introduction

Software bugs cost developers countless hours and resources. Detecting bugs early in source code is one of the hardest challenges in software engineering.  
This project introduces an **AI-powered web application** that automatically detects buggy lines in **Java code** using machine learning models.

🔗 **Live Demo**: [Java Bug Detector](https://java-bugs-1.onrender.com/)

## Problem Statement

- Large open-source projects often contain thousands of commits, and manually tracking buggy code is time-consuming.  
- Developers need an automated way to analyze source code and highlight **buggy lines before they cause failures**.  
- Nowadays, many developers rely on AI code generation tools. While these tools speed up development, **the generated code may introduce hidden bugs**.  
- Traditional static analyzers often produce too many false positives, while our ML-based approach learns from real bug patterns.

## 🎯 Objectives

- Collect and preprocess open-source **Java code datasets**.  
- Train a **machine learning model** to detect buggy vs. clean lines.  
- Build a **web-based interface** where developers can paste or upload Java code and instantly see flagged buggy lines.  
- Provide detailed error feedback for debugging.

## 🛠️ Tech Stack

- **Backend**: Python, Flask/FastAPI  
- **Machine Learning**: TensorFlow / scikit-learn  
- **Frontend**: HTML, CSS, JavaScript  
- **Deployment**: Render

## Proposed Methods

### 🔹 Frontend Development

- Built with **HTML, CSS, and JavaScript**  
- Responsive design for both desktop and mobile users  
- Simple, developer-friendly interface to paste or upload Java code  
- Buggy lines are highlighted in **red** for quick identification

### 🔹 User Interaction Flow

1. **Code Input**: Developer pastes a Java source code file.
2. **Model Selection** : The user selects either Local ML model (TF-IDF-based classifier) or External AI API (Hugging Face / custom provider)
3. **Data Submission**: Code is sent to the Flask backend via HTTP requests.  
4. **Bug Detection**: The backend ML model analyzes each line of code and classifies it as *buggy* or *clean*, and a function checks whether operators like `==` and brackets are balanced.
5. **Results Display**: The app highlights buggy lines and provides instant feedback in the browser.

### 🔹 Data Preprocessing

- Collected commit history from multiple open-source projects using **git clone**  
  (e.g., **Accumulo, Camel, Wicket, Maven, Jackrabbit-Oak, Defects4J**)  
- Extracted **before-commit** and **after-commit** code versions  
- Kept only **modified commits** to focus on bug-related changes  
- Searched for modified lines and split them  
- Tagged lines as:  
  - **Buggy** → Code before commit  
  - **Clean** → Code after commit  
- Removed duplicates, irrelevant commits, and unused features

### 🔹 Two-Step Prediction Pipeline

1. **Language Classification**  
   - Built a **TF-IDF + Logistic Regression** model on a dataset of 22 programming languages (Kaggle dataset).  
   - Accuracy: **0.96** → Ensures the system first validates if the code is **Java**.
2. **Bug Detection**  
   - Implemented multiple ML models:  
     - **TF-IDF + Logistic Regression** (Best performing, accuracy ≈ 0.60)  
     - TF-IDF + XGBoost  
     - TF-IDF + Random Forest  
     - CNN (Deep Learning approach)  
   - Final system uses **TF-IDF + Logistic Regression** for balance between accuracy and speed.

## Methodology

### 📊 Data Exploration and Preprocessing

- **Data Cleaning**: Removed duplicate commits and null values from the dataset.  
- **Feature Engineering**:  
  - Extracted **before-commit** and **after-commit** code for each modification.  
  - Labeled each line of code as:  
    - **Buggy (1)** → If it came from before the fix commit.  
    - **Clean (0)** → If it came from after the fix commit.  
- **Filtering**: Kept only **modified commits** to ensure meaningful samples.  
- **Exploration**: Verified class balance and commit distribution across projects.

### 🤖 Model Training and Evaluation

- **Bug Detector Model**:  
  - Implemented using a **Logistic Regression classifier** with **TF-IDF Vectorization**.  
  - Instead of word-level tokens, used **character-level n-grams** to better capture Java syntax patterns.  
  - Final pipeline:  

    ```python
    pip1 = Pipeline([
        ("tfidf", TfidfVectorizer(analyzer="char")),
        ("clf", LogisticRegression(max_iter=100))
    ])
    ```

  - Accuracy on validation set: **≈ 0.60**

- **Language Classifier (Optional Pre-step)**:  
  - Built another model to identify if code is **Java or not** before running bug detection.  
  - Implemented with **TF-IDF + Logistic Regression** using **character n-grams (2–5)** with whitespace-aware tokenization (`char_wb`).  
  - Final pipeline:  

    ```python
    model = Pipeline([
        ("tfidf", TfidfVectorizer(analyzer="char_wb", ngram_range=(2,5))),
        ("clf", LogisticRegression(max_iter=300, multi_class="ovr"))
    ])
    ```

  - Achieved **0.96 accuracy** on language classification across **22 programming languages**.

### 📈 Performance Metrics

- **Bug Detector (TF-IDF + Logistic Regression)**: Accuracy = **0.60**  
- **Language Classifier (TF-IDF + Logistic Regression)**: Accuracy = **0.96**

### 🌐 Frontend & Flask Integration

- **Flask Backend**:  
  - Built with **Flask** to serve the ML models.  
  - Handles code submission via `POST` requests.  
  - Pipeline:  
    1. **Check if input code is Java** using the **language classifier**.  
    2. **Line-by-line bug detection** using the bug detector pipeline.  
    3. **Function to check whether operators like `==` and brackets `[]{}``() are balanced and correctly used.**  
    4. Return results to the frontend in JSON format.

## 🔮 Future Work

- **Expand functionality**: Add support for additional student attributes (e.g., extracurricular activities, certifications).  
- **Improve algorithms**: Integrate advanced Java-based ML libraries (e.g., Deeplearning4j, Weka) for better prediction performance.  
- **Database integration**: Connect the application with relational databases (MySQL, PostgreSQL) to manage large datasets.  
- **Web integration**: Build a Java-based web application using Spring Boot for online access.  
- **User interface**: Add a JavaFX or Swing GUI for a more interactive and user-friendly experience.  
- **Deployment**: Package the project into a standalone `.jar` file or deploy it as a web service on cloud platforms.  
- **Performance optimization**: Refactor code and improve runtime efficiency for handling large inputs.

## ✅ Conclusion

This Java project provides a structured way to help developers detect buggy lines in their code.  
By combining **machine learning, syntax checks, and a web interface**, it assists developers in identifying potential issues early.  
While currently in its basic stage, the system demonstrates the potential of AI-powered bug detection and sets the stage for future improvements.
