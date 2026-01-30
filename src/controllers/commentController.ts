import Comment from "../model/commentModel";
import BaseController from "./baseController";

class CommentController extends BaseController {
  constructor() {
    super(Comment);
  }
}

export default new CommentController();
