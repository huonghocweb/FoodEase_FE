
import React,{useState,useEffect} from 'react';
import './Comment.css'; // Để thêm CSS cho component
import axiosConfig from '../../../Config/AxiosConfig';
const Comment = (foodDetail) => {
const [comment,setComment ] =useState([]);
const [rating, setRating] = useState(0);
const [review, setReview] = useState('');
const [file, setFile] = useState(null);
const [user,setUser]=useState([]);

const userId =localStorage.getItem('userIdLogin');
  const fetchCommnet = async ()=>{
           await axiosConfig.get(`/user/foodReview/findfoodReviewByFoodId/${foodDetail.foodDetail.foodId}`)
        .then(response =>{
          setComment(response.data)
        
        })
      };
  const fetchUser = async ()=>{
    try {
    
      await axiosConfig.get(`user/${userId}`)
      .then(response =>{
        setUser(response.data)
        
      })
    } catch (error) {
      
    }
    
    
  }
      const handleAdd = async (e) => {
        e.preventDefault();
    
      
        const formData=new FormData();
        if(file)
        {
            formData.append('file', file);
        } 
        formData.append('rating',rating);
        formData.append('review',review);
        formData.append('foodId',foodDetail.foodDetail.foodId);
        formData.append('userId',userId);
        
        try {
            const response = await axiosConfig.post('/user/foodReview/comment',formData,
               { headers: {
                'Content-Type': 'multipart/form-data'
            }}
            
            );
            
            console.log('Added successfully',response);
            Reset();
        } catch (error) {
          
            console.log('Error in adding product');
        }
    };
   
    // phương thức sử lí rating
    const handleRating = (value) => {
      setRating(value);
    };
    const Reset =()=>{
      setFile(null);
      setReview('')
      setRating(0);

    }
 useEffect (() =>{
  fetchCommnet ();
  fetchUser();
 
}

,[comment])

    return (
     
        <div className="review-container ">
          
           <div className="user-info">
      
            <div className="avatar">
              {/* Add an image or icon for the avatar if needed */}
              <img  src={`/assets/images/${user.imageUrl}`}/>
            
              
            </div>
            <div className="user-details">
              <span className="user-name">{user.fullName}</span>
              
              <span className="review-date"></span>
            </div>
          </div>
          <div className="rating">
            
          </div>
          <form encType="multipart/form-data">
          <div className="star-rating">
      {[1, 2, 3, 4, 5].map((value) => (
        <span
         
          className={`star ${value <= rating ? 'active' : ''}`}
          onClick={() => handleRating(value)}
        >
          &#9733;
        </span>
      ))}
      <span className="rating-value">{rating} sao</span>
    </div>


    <div className="comment">
     
      <input
        type="text"
        name="review"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        className="styled-input"
        placeholder="Comment..."
      />
      <input
        type="file"
        name="file"
        onChange={(e) => setFile(e.target.files[0])}
        
        
      />
      <button onClick={handleAdd}>Send</button>
    </div>
  </form>

         
        <hr/>
                {comment.map(comment => (
          <div key={comment.id} className="comment-item">
            <div className="user-info">
              <div className="avatar">
              <img src={`/assets/images/${comment.user.imageUrl}`}/>
                {/* Add an image or icon for the avatar if needed */}
              </div>
              <div className="user-details">
                <span className="user-name">{comment.user.fullName}</span>
                <span className="review-date">{comment.reviewDate}</span>
              </div>
              
            </div>
            <div className="rating">
              {comment.rating}⭐
            </div>
            <div className="comment">
              {comment.review}
            </div>
            <div className="comment-image">
              <img src={`/assets/images/${comment.imageUrl}`}/>
              
              
            </div>
            <div className="reply">
              <span className="reply-from">TASTY Kitchen</span>
              <div className="reply-message">
                Cảm ơn quý khách đã tin yêu và ủng hộ TASTY, chúc quý khách có những trải nghiệm tuyệt vời cùng TASTY!
              </div>
            </div>
            <br/>
          </div>
        
        ))}


        </div>
      );
};

export default Comment;