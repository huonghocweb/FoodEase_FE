
import React,{useState,useEffect, useRef} from 'react';
import './Comment.css'; // Để thêm CSS cho component
import axiosConfig from '../../../Config/AxiosConfig';
import CustomAlert from '../../../Config/CustomAlert';
const Comment = (foodDetail) => {
// const [imagePr,setImga]

// const imgRef = useRef();
// imgRef.current = null;

const [comment,setComment ] =useState([]);
const [rating, setRating] = useState(0);
const [review, setReview] = useState('');
const [file, setFile] = useState(null);
const [user,setUser]=useState([]);
const [alert, setAlert] = useState(null);
const [Image,setImage]=useState([null]);
const userId =localStorage.getItem('userIdLogin');
const handleFileChange = (e) => {
  const selectedFile = e.target.files[0];
  if (selectedFile) {
    setFile(selectedFile);
    setImage(URL.createObjectURL(selectedFile)); 
  }
};
const Delete=(id)=>{
  try {
    axiosConfig.delete(`/user/foodReview/deleteByid/${id}`);
    setAlert({ type: 'success', message: 'Delete success! '});
    setTimeout(() => {
      setAlert(null); // Xóa thông báo
  }, 2000);
  } catch (error) {
    setAlert({type : 'error', message : 'Delete Failed!'});
    setTimeout(() => {
      setAlert(null); // Xóa thông báo
  }, 2000);
  }
   

}
  const fetchCommnet = async ()=>{
           await axiosConfig.get(`/user/foodReview/findfoodReviewByFoodId/${foodDetail.foodDetail.foodId}`)
        .then(response =>{
          setComment(response.data)
        
        })
      };
  const fetchUser = async ()=>{
    try {
    
      await axiosConfig.get(`/user/findUserByid/${userId}`)
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
            
            setAlert({ type: 'success', message: 'Comment success! '});
            setTimeout(() => {
              setAlert(null); // Xóa thông báo
          }, 2000);
            Reset();
        } catch (error) {
          setAlert({type : 'error', message : 'Please fill in the information completely?'});
          setTimeout(() => {
            setAlert(null); // Xóa thông báo
        }, 2000);
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
      setImage(null);

    }
 useEffect (() =>{
  fetchCommnet ();
  fetchUser();

}

,[comment])

    return (
        <>
             {alert && (
        <CustomAlert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
        <div className="review-container ">
          
          
           <div className="user-info">
      
            <div className="avatar">
              {/* Add an image or icon for the avatar if needed */}
              <img  src={user.imageUrl ? `/assets/images/${user.imageUrl} `:`/assets/images/blog_post_01.jpg`}/>
            
              
            </div>
            <div className="user-details">
              <span className="user-name">{user.fullName ?user.fullName: 'User' }</span>
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
      
            <div class="file-upload">
                        <label for="file-input" class="custom-file-upload">
                           Chọn ảnh
                        </label>
                        <input
                         id="file-input"
                  type="file" 
                  style={{ display: 'none' }} 
                  onChange={handleFileChange}
                
                
              />
                       
                    </div>
       {Image && (
        <div className="comment-Image">
          <img src={Image} />
        </div>
      )}
      <button onClick={handleAdd}>Send</button>
    </div>
  </form>

         
        <hr/>
                {comment.map(comment => (
          <div key={comment.id} className="comment-item">
            <div className="user-info">
              <div className="avatar">
              <img src={comment.user.imageUrl ? `/assets/images/${comment.user.imageUrl}`: `/assets/images/blog_post_01.jpg`}/>
                {/* Add an image or icon for the avatar if needed */}
              </div>
              <div className="user-details">
                <span className="user-name">{comment.user.fullName ? comment.user.fullName :'User'}</span>
                <span className="review-date">{comment.reviewDate}</span>
              </div>
              
            </div>
            <div className="rating">
              {comment.rating.toFixed(1)}⭐
            </div>
            <div className="comment">
              {comment.review}
            </div>
            <div className="comment-image">
              <img src={`${comment.imageUrl}`}/>
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
        </>
      );
};

export default Comment;