# Smart India Hackathon 2022
## Winning team submission for the Software Division

About the Smart India Hackathon: https://sih.gov.in

*Problem Statement*
==================
Theme: Heritage and culture
PS Number: AD976
https://sih.gov.in/sih2022PS?technology_bucket=NQ==&category=QWxs&organization=QWxs&organization_type=QWxs

Title: Sanskrit voice to text and interface in Google Search Engine.

Full Description of PS:
"Sanskrit, a classical language, is one of the oldest languages of the human civilisation, the language of ancient sciences and technologies, of classical Indian philosophies including Buddhism and Jainism. Presently the Google voice to text search doesn’t support this language. Background- Presently google supports 119 languages for Voice to Text conversion support but Sanskrit is not yet one of them. The Indian culture also known as Sanskriti, finds myriads of exuberant expressions covering all aspects of life in millions of Sanskrit texts that have been deciphered and others that yet remain to be decoded. A bulk of the tangible and intangible treasures of our cultural heritage lie embedded in the annals of Sanskrit works. Moreover, as yoga spreads like wild-fire across the globe, there is section of the world’s population that is developing a keen interest in delving into and dealing with this ancient tongue. However, the world’s most widely used search engine google does not have the feature to recognize Sanskrit speech yet. Having this feature, will give access to many across the world to all the knowledge, beauty and wisdom of Sanskrit language. Relevance/Detailed Description Recently published book named “Sanskrit and Development of World Thought” by Professor V. Kutumba Sastry (1950) is currently Vice-Chancellor, Rashtriya Samskrit Samsthan, New Delhi and Mr. A. Raghuramaraju (Prof . University of Hydrabad and PhD. IIT Kanpur ), details lot of aspects and the contribution of Sanskrit to the development of world thought. Importance of Rigveda in the human life, and it is in Sanskrit. Contribution to philosophy, mathematics, astronomy, grammar, medicine, ecology, public administration, poetry and poetics, among many other branches, significance of Ramayana in world literature, Sanskrits influence on Western phonetics; elements of ecology in Ramayana; techniques of Theodor Stcherbatsky and his followers in translating Sanskrit philosophical texts; management wisdom by Chanakya which is described in Sanskrit texts, greater adoptions of Yoga in America, perspective of inspirational leadership from Gita and reception of Natya in Europe, specifically in Croatia [ Extract from Amazon Site ] are great and relevant examples one can observe. Sanskrit is taught as a second language in many schools in India and assumed as the first language in Vedic schools. This deserves a way to get it translated to text and reach the world via Google’s all encompassing Voice to text service Objectives Develop a Voice to search plugin or feature which effectively listens to Sanskrit words and converts to text. Further, the objective is to come up with ways and means to make meaningful digital application/s that can use this plugin and generate feature-rich application that applies at one or more scenarios and helps us build use of Sanskrit language in day to day life. The objective of this problem statement resolution is also to come up with innovative application, service and/or integration which can help support spread of Vedic knowledge, generate quicker transcripts in Sanskrit and help new generations. This can be well designed using comprehensive Artificial Intelligence algorithms and deliver end to end solution which fits into google ecosystem and thereby reaches the world."

*Solution Description*
=====================
Sanskrit, being one of the oldest languages has a lot of manuscripts that are still not researched by relevant scientists. Develop a Voice to search plugin or feature which effectively listens to Sanskrit words and converts them to text. Further, the objective is to come up with ways and means to make meaningful digital application/s that can use this plugin and generate a feature-rich application that helps us build the use of the Sanskrit language in day-to-day life.

We developed the plugin as a browser extension that can record Sanskrit audio and convert it to Devanagari text using a backend API. The text is directly copied to the Google search engine. The backend uses a Pytorch CNN model to convert the audio file to text and returns it.
Additional features are added to the plugin like showing synsets (words with similar meanings) and Find-in-Page that help expand its domain of usage and research potential.

The extension is easy to install and use and can be added to any computer. It produces highly accurate results even in noisy environments. It removes the need for typing Devanagari text, which makes searching Sanskrit extremely difficult.
The additional features add the learning aspect of Sanskrit to the plugin, which can be used to research topics/manuscripts in Sanskrit and even for learning the pronunciation of Sanskrit words. 
Synsets can help in understanding otherwise difficult sentences.

There does not exist a feature in Google or any other search engine to search Sanskrit or any transcription tool because its usage is not prevalent. It is developed with a focus on enabling and encouraging research in Sanskrit. 
There are thousands of manuscripts in Sanskrit that have still not been read but contain vast knowledge about the science of ancient times. Due to the lack of Sankrit knowledge, engineers are not able to understand/research these documents.

Sangyan can help in promoting research in Sankrit and even its daily usage by providing an interface with Google and the ability to easily search and understand topics in Sanskrit.
It can even help students who are studying Sanskrit in school similarly.

The extension only needs scalability in the backend, which can easily be achieved by cloud hosting on Kubernetes which can provide load-balancing once the usage of the extension increases.

Once the backend is hosted on a cloud platform, we may need a minor payment to keep the server running. It is currently around Rs 1000 per year, which can be easily compensated even if people provide Rs 5 while installing the extension.

Sangyan is a software product that does not directly affect the environment. So it is environmentally sustainable.
