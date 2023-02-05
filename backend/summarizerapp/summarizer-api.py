from summarizer import Summarizer
from pdf2jpg import pdf2jpg
import os
import cv2 
import pytesseract

def summarizerTool(pdf_path):
    inputpath = pdf_path
    outputpath = r""
    result = pdf2jpg.convert_pdf2jpg(inputpath,outputpath, pages="ALL")
    text2 = ''
    for filename in os.listdir(pdf_path+'_dir'):
        f = os.path.join(pdf_path+'_dir', filename)
        print(f)
        img = cv2.imread(f)

        # img to string
        #custom_config = r'--oem 3 --psm 6'
        pytesseract.pytesseract.tesseract_cmd = r'C:\\Users\\91992\\Desktop\\Hackathons\\SPIT Oculus 2023\\test\\venv\\Lib\site-packages\\Tesseract-OCR\\tesseract.exe'
        text1 = pytesseract.image_to_string(img)
        text2+=text1
    text3 = text2.replace('\n', '')

    model = Summarizer()
    result = model(text3, min_length=60, max_length = 500 , ratio = 0.4)

    summarized_text = ''.join(result)
    print (summarized_text)
    return summarized_text

# summarizerTool(pdf_path)

