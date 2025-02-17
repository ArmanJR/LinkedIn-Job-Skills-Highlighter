# LinkedIn Job Skills Highlighter

A Tampermonkey script that automatically highlights your keywords across LinkedIn job descriptions.

https://github.com/user-attachments/assets/2cf29b46-a802-49d8-bc14-d776561d36cc

## Installation

1. Install a user script manager extension (like [Tampermonkey](https://www.tampermonkey.net/))
2. Visit [LinkedIn Job Skills Highlighter](https://greasyfork.org/en/scripts/527243-linkedin-job-skills-highlighter)
3. Click `Install` button

### Skills Customization

After installing the script:

1. Click on the Tampermonkey extension icon on your browser, then click `Dashboard`
2. Open `LinkedIn Job Skills Highlighter` from the list
3. Select all the codes and copy
4. Go to [ChatGPT](https://chatgpt.com) or your preferred AI chatbot that support uploading files
5. Upload your resume
6. Copy and paste this prompt:

```
This is a Tampermonkey script that highlights keywords on LinkedIn jobs. Based on my attached resume and my skills, modify the code's skillsHighlight 'strong' and 'intermediate' objects.
DO NOT change or add any 'weak' skills. Do NOT add any skill not mentioned in the resume. DO NOT change any other part of the code.
Re-write the full script with changes applied.

Script:

[paste code from step 3 here]
```

7. Copy the generated code into the Tampermonkey script, and save
8. Refresh LinkedIn

## Features

- Case-insensitive keyword matching
- Works with dynamic content loading
- Customizable keywords and colors
- Initially configured for LinkedIn but can be modified for any website

## License

MIT License
