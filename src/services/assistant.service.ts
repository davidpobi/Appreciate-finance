import { IAssistantResponse } from "../interfaces/assistant";


export const GenerateAssitantResponse = async(prompt:string) => { 

    let  {success,data}: IAssistantResponse = {success:false, data:null}; 
    try {
      console.log(`prompt: ${prompt}`);
      // await handleQuery(prompt);
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          operation: "generateResponse",
          prompt: prompt,
        }),
      });

      console.log('response',response);

      if (!response.ok) {
        console.log("Failed to generate response");
        return null;
      }

      const data_:any = await response.json();
     console.log('data_',data_);
      success = true;
    }catch(err){
     console.log('err', err);
     success = false;
     data = null;
    }

    return {success,data};
}
  