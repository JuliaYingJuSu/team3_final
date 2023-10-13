import { useEffect, useState } from 'react';

function PostRestaurant() {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    // 請求讀取 JSON 檔案
    fetch('../data/post_restaurant.json') 
      .then((response) => response.json())
      .then((data) => setJsonData(data))
      .catch((error) => console.error('Error reading JSON file:', error));
      
  }, []);


  // 渲染 JSON 數據
  return (
    <div>
      {jsonData ? (
        <pre>{JSON.stringify(jsonData, null, 2)}</pre>
      ) : (
        <p>Loading JSON data...</p>
      )}
    </div>
  
  );
}

export default PostRestaurant;





