import React, { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import Timer from "./Timer";
import { Link } from "react-router-dom";



const CreateNote = () => {
  const editorRef = useRef(null);
  const isProgrammaticChange = useRef(false); // Track programmatic changes

  const [userPrompt, setUserPrompt] = useState("");
  const [result, setResult] = useState("");

  const handleFetchData = async () => {
    try {
      const response = await axios.post(
        "https://voice-gpt-backend.vercel.app/api",
        {
          prompt:
           userPrompt
        }
      );

      const newResult = response.data.result;
     
    const updatedContent = `<p style="background-color: blue;">${userPrompt} \n ${result}</p><p style="background-color: green;">${ formatBulletPoints(formattingFun(formatGeminiResponse(newResult)))}</p>`;


      isProgrammaticChange.current = true; // Mark as programmatic change
      setResult(updatedContent);

      if (editorRef.current) {
        editorRef.current.setContent(updatedContent);
      }
    } catch (error) {
      console.error(error);
    }
  };




  // to render text in formate
  //----
 
const formatGeminiResponse = (response) => {
  // Step 1: Remove single stars
  let formattedResponse = response.replace(/\*([^]+)\*/g, '$1');

  // Step 2: Handle double stars for bold formatting
  formattedResponse = formattedResponse.replace(/\*\*(.?)\*\*/g, '<strong>$1</strong>');

  // Step 3: Detect bullet points and wrap them in <li> tags
  formattedResponse = formattedResponse.replace(/^\*\s(.+)$/gm, '<li>$1</li>');

  // Step 4: Add <p> tags for paragraphs, ensuring no multiple new lines between them
  formattedResponse = formattedResponse
      .split(/\n{2,}/) // Split on multiple new lines
      .map((line) => {
          if (!line.startsWith('<li>')) {
              return `⁠<p>${line.trim()}</p>`
          }
          return line;
      })
      .join(''); // Rejoin paragraphs with single line breaks between them

  // Step 5: Wrap <li> tags with <ul>
  formattedResponse = formattedResponse.replace(/(<li>.*?<\/li>)/gs, '<ul>$1</ul>');

  return formattedResponse;
};

const formattingFun = (inputText) => {
  // Remove all unnecessary single stars (*)
  let cleanedText = inputText.replace(/\*/g, "");

  // Return the cleaned text
  return cleanedText;
};

const formatBulletPoints = (inputText) => {
  // Ensure bullet points (numbers or asterisks) are followed by a newline
  const formattedText = inputText.replace(/(\d+\.\s|\*\s)([^\n])/g, '$1\n$2');

  // Remove any excessive multiple newlines
  return formattedText.replace(/\n{2,}/g, '\n\n');
};


  //---
  //to render text in formate

  const handleEditorChange = (content) => {
    // Avoid updates from programmatic changes
    if (!isProgrammaticChange.current) {
      setResult(content);
    } else {
      isProgrammaticChange.current = false; // Reset after programmatic change
    }
  };

  return (
    
    <>


        <div className=" min-h-[100vh] max-h-fit bg-[#494F55] w-[100dvw] py-10 px-20">


          {/* Search bar */}
      <div className=" flex items-center justify-center">
        <div className="relative  w-[100%] rounded-sm flex items-center gap-[.1rem] justify-between mb-10  ">

            <div className="">
                <Timer></Timer>
            </div>


            {/* search div */}
            <div className="flex w-[60%] items-center justify-center">

            <input
            onChange={(e) => setUserPrompt(e.target.value)}
            type="text"
            className=" text-[21px] pl-8 w-full py-[0.08rem] "
            placeholder="Enter prompt"
          />
          <button
            onClick={handleFetchData}
            className="bg-blue-400 px-5 py-[0.4rem] rounded-sm"
          >
            Search
          </button>

            </div>
         

          <button className="bg-[#222F3E] hover:bg-[#17212d] text-white font-bold py-2 px-4 rounded"><Link to='/test' state={result}>TEST</Link></button>
        </div>
       
      </div>

      {/* Text Editor */}
      <div className="px-10 mt-8">
        <Editor
          apiKey={import.meta.env.VITE_REACT_APP_TINY_MCE}
          onInit={(_evt, editor) => (editorRef.current = editor)}
          value={result}
          onEditorChange={handleEditorChange}
          init={{
            height: 500,
            menubar: "file edit view insert format",
            skin: "oxide-dark", // Use the dark theme for the editor
          content_css: "dark", // Use the dark theme for content inside the editor
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount"
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:18px }"
          }}
        />
      </div>

        </div>

    
    </>
  );
};

export default CreateNote;