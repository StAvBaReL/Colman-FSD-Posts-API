import Post from "../model/postModel";
import BaseController from "./baseController";

class PostController extends BaseController {
  constructor() {
    super(Post);
  }
}

export default new PostController();
