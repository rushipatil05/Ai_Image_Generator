const token = " ";//Enter Token Here
const inputTxt = document.getElementById("prompt-input");
const image = document.getElementById("image-card1");
const image1 = document.getElementById("image-card2");
const button = document.getElementById("generate-btn");
const downloadBtn1 = document.getElementById("download-btn1");
const downloadBtn2 = document.getElementById("download-btn2");

async function query(prompt) {
  image.src = "images/loader1.svg";
  image1.src = "images/loader1.svg";

  const response = await fetch(
    "https://api-inference.huggingface.co/models/Melonie/text_to_image_finetuned",
    {
      headers: { Authorization: `Bearer ${token}` },
      method: "POST",
      body: JSON.stringify({ inputs: prompt }),
    }
  );
  const result = await response.blob();
  return result;
}

button.addEventListener("click", async function () {
  const prompt = inputTxt.value;
  query(prompt).then((response) => {
    const objectURL = URL.createObjectURL(response);
    image.src = objectURL;

    downloadBtn1.onclick = () => {
      const a = document.createElement("a");
      a.href = objectURL;
      a.download = "image1.png";
      a.click();
    };
  });

  // Add a random suffix to the prompt for the second image generation
  const randomSuffix = Math.random().toString(36).substr(2, 5);
  const promptWithSuffix = `${prompt} ${randomSuffix}`;
  query(promptWithSuffix).then((response) => {
    const objectURL = URL.createObjectURL(response);
    image1.src = objectURL;
    
    downloadBtn2.onclick = () => {
      const a = document.createElement("a");
      a.href = objectURL;
      a.download = "image2.png";
      a.click();
    };
  });
});