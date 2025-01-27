# -*- coding: utf-8 -*-
"""SA.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1qJejXs8JS65SUJ7o1_E-qR7DawQL9MIq
"""

!pip install fastapi uvicorn

!pip install PyPDF2
!pip install nltk
!pip install pdfminer
!pip install docx2txt

import PyPDF2
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from collections import Counter
# Install required libraries
!pip install pdfminer.six
!pip install nltk
!pip install wordcloud

# Import required libraries
import io
from pdfminer.converter import TextConverter
from pdfminer.pdfinterp import PDFPageInterpreter
from pdfminer.pdfinterp import PDFResourceManager
from pdfminer.pdfpage import PDFPage
import docx2txt
import re
import operator
import nltk
nltk.download('punkt')
nltk.download('stopwords')
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from wordcloud import WordCloud
from nltk.probability import FreqDist
import matplotlib.pyplot as plt
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

nltk.download('punkt')
nltk.download('all')

!pip install pdfplumber

from google.colab import drive
drive.mount('/content/drive')

def read_word_resume(word_doc):
     resume = docx2txt.process(word_doc)
     resume = str(resume)
     #print(resume)
     text =  ''.join(resume)
     text = text.replace("\n", "")
     if text:
         return text

def read_pdf_resume(pdf_doc):
    resource_manager = PDFResourceManager()
    fake_file_handle = io.StringIO()
    converter = TextConverter(resource_manager, fake_file_handle)
    page_interpreter = PDFPageInterpreter(resource_manager, converter)
    with open(pdf_doc, 'rb') as fh:
        for page in PDFPage.get_pages(fh, caching=True,check_extractable=True):
            page_interpreter.process_page(page)
        text = fake_file_handle.getvalue()
    # close open handles
    converter.close()
    fake_file_handle.close()
    if text:
        return text

def get_missing_skills(job_description, resume):
    # Clean and preprocess both texts
    def clean_text(text):
        # You can implement your own text cleaning/preprocessing logic here
        cleaned_text = text.lower()  # Convert to lowercase for consistency
        # Add more preprocessing steps if required
        return cleaned_text

    job_description = clean_text(job_description)
    resume = clean_text(resume)

    # Tokenize the text into individual words
    def tokenize(text):
        # You can implement your own tokenization logic here
        words = text.split()
        # Add more tokenization steps if required
        return words

    job_description_words = tokenize(job_description)
    resume_words = tokenize(resume)

    # Create sets of unique words
    job_description_skills = set(job_description_words)
    resume_skills = set(resume_words)

    # Calculate the missing skills (keywords)
    missing_skills = job_description_skills - resume_skills

    return missing_skills

if __name__ == '__main__':
    # Example usage
    skill=[]
    job_description = input("\nEnter the Job Description: ")
    resume = read_pdf_resume('/content/drive/MyDrive/barry_allen_fe.pdf')
    lst=['certification', 'qualification','diploma', 'graduation','experience in Java development','Working Experience','competencies', 'proficiencies','Relational Databases','AWS','Web developments','Web applications','React','devops'
    ,'technical', 'programming', 'tools','Python', 'c', 'c++', 'Java','sql','Block Chain','front end','full stack development','back end','iot','cloudcomputing','machine learning and artificial intelligence','deep learning','Mongo DB','MySQL','HTML','CSS','JavaScript','Ruby','.Net','PHP','Oracle','UX designer','UX','AI tools']
    missing_skills = get_missing_skills(job_description, resume)
    print("\nMissing Skills in Resume:")
    for i in missing_skills:
        skill.append(i)
   # print(skill)
result_set = set(skill).intersection(lst)

# Convert the result back to a list
result_list = list(result_set)
for item in result_list:
    print(item)

# pdf of job desc to text
import PyPDF2

def pdf_to_text(pdf_file_path):
    text = ""
    with open(pdf_file_path, "rb") as file:
        pdf_reader = PyPDF2.PdfReader(file)
        for page in pdf_reader.pages:
            text += page.extract_text()
    return text

# Replace 'your_pdf_file.pdf' with the path to your PDF file
pdf_file_path = "/content/drive/MyDrive/job_desc_front_end_engineer.pdf"
extracted_text = pdf_to_text(pdf_file_path)
print(extracted_text)

