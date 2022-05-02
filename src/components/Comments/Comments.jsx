import React, { useEffect, useState } from "react";
import styles from "./comments.module.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import {
  selectComments,
  getCommentsAsync,
  postCommentAsync,
} from "../../features/comments/commentsSlice";
import { selectLogin } from "../../features/login/loginSlice";
import Loading from "../Loading/Loading";

function Comments({ productID }) {
  const [textInput, setTextInput] = useState("");
  const [renderComments, setRenderComments] = useState();
  const commentsProduct = useSelector(selectComments);
  const dispatch = useDispatch();

  // get Product Comments the first times
  useEffect(() => {
    dispatch(getCommentsAsync(productID));
    setRenderComments(commentsProduct.comments);
  }, []);

  // set render comments when new comment appear
  useEffect(() => {
    setRenderComments(commentsProduct.comments);
  }, [commentsProduct.comments]);

  // handle comments
  const handlePostComment = () => {
    const data = {
      productId: productID,
      content: textInput,
    };
    dispatch(postCommentAsync(data));
    setTextInput("");
  };

  if (commentsProduct.isLoading)
    return (
      <div className={styles.loading}>
        <Loading></Loading>
      </div>
    );

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Bình luận</h1>
      </div>

      <div className={styles.userComment}>
        <div className={styles.row}>
          <div className={styles.imgWrapper}>
            <img src="/images/user-image.jpg" alt="user" />
          </div>

          <div className={styles.userInput}>
            <TextField
              fullWidth
              id="user-comment"
              label="Bình luận về sản phẩm"
              variant="standard"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.userCommit}>
            <Button variant="contained" onClick={handlePostComment}>
              Bình luận
            </Button>
          </div>
        </div>
      </div>

      <ul className={styles.productCommentsList}>
        {renderComments &&
          renderComments.map((item) => (
            <li key={item._id} className={styles.productComment}>
              <div className={styles.row}>
                <div className={styles.imgWrapper}>
                  <img src="/images/user-image.jpg" alt="user" />
                </div>

                <div className={styles.userInput} key={item.userID}>
                  <TextField
                    fullWidth
                    id="outlined-name"
                    label={item.username}
                    variant="standard"
                    value={item.content}
                    InputProps={{
                      readOnly: true,
                    }}
                    InputLabelProps={{ shrink: true }}
                  />
                </div>
              </div>

              <div className={styles.commentController}>
                <span className={styles.like}>Thích</span>

                <span className={styles.reply}>Trả lời</span>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Comments;
