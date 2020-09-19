from rev_ai import custom_vocabularies_client
from rev_ai.models import CustomVocabulary

ACCESS_TOKEN = '02iqVXp0raryjFYryUUdjBxprNH0eklGxcgpOCA6vppIhe_xev7gspbf5E0iymvCSRNwW-BA6wFPVjIO1yK0zrTBKyYYo'
wordlist = []


client = custom_vocabularies_client.RevAiCustomVocabulariesClient(ACCESS_TOKEN)

with open('vocab.txt') as fp:
    for line in fp:
        wordlist.append(line.strip())
    custom_vocabulary = CustomVocabulary(wordlist)

# Submit the CustomVocabulary
custom_vocabularies_job = client.submit_custom_vocabularies([custom_vocabulary])