---
title: "Drawing LaTex/Tikz Picture via GPT-4"
date: "2023-08-30"
slug: "en/chatgpt_tikz"
math: mathjax
---
I am a subscriber of GPT-4. Today I learned that you don't need to pay to get access to access Bard, and Bard accepts picture (given as a link) as input. The first things I want to try is to ask Bard to draw LaTex/Tikz picture for me, for that is what I will need for papers. But life is busy enough without learning Tikz commands already, I never properly learn Tikz enough. 

 **The result? Very disappointing**. Bard does not know what it is doing. It gave me some code supposed to draw some random pictures from [chegg.com](chegg.com), a site I hate for obvious reason as a teacher. It does not understand the picture at all. 

Then it comes me to test it out on GPT-4. However, GPT-4 does not accept picture as links. But instead you can describe the graph you try to draw in words. After all, it is a language model. (I doubted that I could describe a graph in English very well. Good luck, GPT-4.)

**The result? Astonishingly well!** Here is [the conversation](https://chat.openai.com/share/bb6ad32b-3ddb-4f48-a65f-981161ed7abd) I had with GPT-4.
The target picture I try to draw is the following, something I picked up randomly on [StackExchange](https://tex.stackexchange.com/questions/563121/drawing-a-wheel-graph-with-tikz?rq=1).
![Target Picture](https://i.stack.imgur.com/ZmtpW.png)

### Round 1: My bad. I did not describe the picture very well. (I said it was going to be hard for me, right?)
![Round 1](/images/en/tikz_test_1.png)

### Round 2: Maybe I was me not saying it very well or GPT-4 forgot to connect the last link in a cycle.

![Round 2](/images/en/tikz_test_2.png)

### Round 3: Looks very good now. But the lines goings through the center circle bug me.
![Round 3](/images/en/tikz_test_3.png)

### Round 4: Ha, now every circle has lines going through.
![Round 4](/images/en/tikz_test_4.png)

### Round 5: Fixed!
![Round 5](/images/en/tikz_test_5.png)

### Round 6: Let's fill some grey-ish color.
![Round 6](/images/en/tikz_test_6.png)

## Conclusion
GPT-4 can help drawing picture via LaTex/Titz. It is going to be very helpful especially if you know some Tikz commands, but are not so confident in using it because of the feeling of unfamiliarity (Trust me, I am on the same boat). Of course, you might want to use some what-you-see-is-what-you-get tool for that purpose. For that I recommend [Mathcha.io](https://www.mathcha.io/). I really hope that someday it is so developed to equip with a more powerful version of ChatGPT to help the picture drawing. You can then drag your mouse to draw if you want, at the same time you can also describe the picture and ask ChatGPT to update it for you. I hope that day is not too far away.


