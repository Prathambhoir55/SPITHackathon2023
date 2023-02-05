# import cv2 
# import pytesseract
# import re
# from pdf2jpg import pdf2jpg
# import os
# import pprint
# import itertools
# import re
# import pke
# import string
# from nltk.corpus import stopwords
# from nltk.tokenize import sent_tokenize
# from flashtext import KeywordProcessor
# import requests
# import json
# import re
# import random
# from pywsd.similarity import max_similarity
# from pywsd.lesk import adapted_lesk
# from pywsd.lesk import simple_lesk
# from pywsd.lesk import cosine_lesk
# from nltk.corpus import wordnet as wn
# from summarizer import Summarizer


# def summarizerTool(pdf_path):
#     inputpath = pdf_path
#     outputpath = os.path.join(os.getcwd(), 'media')
#     result = pdf2jpg.convert_pdf2jpg(inputpath,outputpath, pages="ALL")
#     text2 = ''
#     for filename in os.listdir(pdf_path+'_dir'):
#         f = os.path.join(pdf_path+'_dir', filename)
#         print(f)
#         img = cv2.imread(f)

#         # img to string
#         #custom_config = r'--oem 3 --psm 6'
#         pytesseract.pytesseract.tesseract_cmd = r'C:\\Users\\91992\\Desktop\\Hackathons\\SPIT Oculus 2023\\test\\venv\\Lib\\site-packages\\Tesseract-OCR\\tesseract.exe'
#         # import shutil
#         # shutil.rmtree(directory_path)
#         text1 = pytesseract.image_to_string(img)
#         text2+=text1
#     text3 = text2.replace('\n', '')

#     model = Summarizer()
#     result = model(text3, min_length=60, max_length = 500 , ratio = 0.4)

#     summarized_text = ''.join(result)
#     print (summarized_text)
#     return text3, summarized_text


# def get_nouns_multipartite(text, summarized_text):
#     out=[]
#     stoplist = list(string.punctuation)
#     stoplist += ['-lrb-', '-rrb-', '-lcb-', '-rcb-', '-lsb-', '-rsb-']
#     stoplist += stopwords.words('english')
#     extractor = pke.unsupervised.MultipartiteRank()
#     extractor.load_document(input=text,stoplist=stoplist)
#     #    not contain punctuation marks or stopwords as candidates.
#     pos = {'PROPN','NOUN'}
#     #pos = {'VERB', 'ADJ'}

#     extractor.candidate_selection(pos=pos, )
#     # 4. build the Multipartite graph and rank candidates using random walk,
#     #    alpha controls the weight adjustment mechanism, see TopicRank for
#     #    threshold/method parameters.
#     extractor.candidate_weighting(alpha=1.1,
#                                   threshold=0.75,
#                                   method='average')
#     keyphrases = extractor.get_n_best(n=20)

#     for key in keyphrases:
#         out.append(key[0])

#     keywords = out
#     filtered_keys=[]
#     for keyword in keywords:
#         if keyword.lower() in summarized_text.lower():
#             filtered_keys.append(keyword)
#     return filtered_keys



# def tokenize_sentences(text):
#     sentences = [sent_tokenize(text)]
#     sentences = [y for x in sentences for y in x]
#     # Remove any short sentences less than 20 letters.
#     sentences = [sentence.strip() for sentence in sentences if len(sentence) > 20]
#     return sentences

# def get_sentences_for_keyword(keywords, sentences):
#     keyword_processor = KeywordProcessor()
#     keyword_sentences = {}
#     for word in keywords:
#         keyword_sentences[word] = []
#         keyword_processor.add_keyword(word)
#     for sentence in sentences:
#         keywords_found = keyword_processor.extract_keywords(sentence)
#         for key in keywords_found:
#             keyword_sentences[key].append(sentence)

#     for key in keyword_sentences.keys():
#         values = keyword_sentences[key]
#         values = sorted(values, key=len, reverse=True)
#         keyword_sentences[key] = values
#     return keyword_sentences

# def sentforword(filtered_keys,summarized_text):
#     sentences = tokenize_sentences(summarized_text)
#     keyword_sentence_mapping = get_sentences_for_keyword(filtered_keys, sentences)
#     return keyword_sentence_mapping


# def get_distractors_wordnet(syn,word):
#     distractors=[]
#     word= word.lower()
#     orig_word = word
#     if len(word.split())>0:
#         word = word.replace(" ","_")
#     hypernym = syn.hypernyms()
#     if len(hypernym) == 0: 
#         return distractors
#     for item in hypernym[0].hyponyms():
#         name = item.lemmas()[0].name()
#         #print ("name ",name, " word",orig_word)
#         if name == orig_word:
#             continue
#         name = name.replace("_"," ")
#         name = " ".join(w.capitalize() for w in name.split())
#         if name is not None and name not in distractors:
#             distractors.append(name)
#     return distractors

# def get_wordsense(sent,word):
#     word= word.lower()
    
#     if len(word.split())>0:
#         word = word.replace(" ","_")
    
    
#     synsets = wn.synsets(word,'n')
#     if synsets:
#         wup = max_similarity(sent, word, 'wup', pos='n')
#         adapted_lesk_output =  adapted_lesk(sent, word, pos='n')
#         lowest_index = min (synsets.index(wup),synsets.index(adapted_lesk_output))
#         return synsets[lowest_index]
#     else:
#         return None

# def final(keyword_sentence_mapping):
#     key_distractor_list = {}

#     for keyword in keyword_sentence_mapping:
#         wordsense = get_wordsense(keyword_sentence_mapping[keyword][0],keyword)
#         if wordsense:
#             distractors = get_distractors_wordnet(wordsense,keyword)
#     #         if len(distractors) ==0:
#     #             distractors = get_distractors_conceptnet(keyword)
#             if len(distractors) != 0:
#                 key_distractor_list[keyword] = distractors

#     index = 1
#     # print ("#############################################################################")
#     # print ("NOTE::::::::  Since the algorithm might have errors along the way, wrong answer choices generated might not be correct for some questions. ")
#     # print ("#############################################################################\n\n")
#     all_questions = []
#     all_choices = {}
#     all_answers = []
#     for each in key_distractor_list:
#         sentence = keyword_sentence_mapping[each][0]
#         pattern = re.compile(each, re.IGNORECASE)
#         all_answers.append(each)
#         print('sentence : '+sentence)
#         output = pattern.sub( " _______ ", sentence)
#         all_questions.append(output)
#         print ("%s)"%(index),output)
#         choices = [each.capitalize()] + key_distractor_list[each]
#         top4choices = choices[:4]
#         random.shuffle(top4choices)
#         optionchoices = ['a','b','c','d']
#         temp = []
#         for idx,choice in enumerate(top4choices):
#             print ("\t",optionchoices[idx],")"," ",choice)
#             temp.append(choice)
#         all_choices[index]=temp
#         #print ("\nMore options: ", choices[4:20],"\n\n")
#         index = index + 1
#     return all_answers, all_questions, all_choices


# def final_api(pdf_path): #main function
#     full_text, summarized_text = summarizerTool(pdf_path)
#     filtered_keys = get_nouns_multipartite(full_text, summarized_text)
#     keyword_sentence_mapping = sentforword(filtered_keys, summarized_text)
#     all_answers, all_questions, all_choices = final(keyword_sentence_mapping)
#     return all_answers, all_questions, all_choices


# # all_answers, all_questions, all_choices = api(pdf_path)

# # print(all_answers)
# # print(all_questions)
# # print(all_choices)

