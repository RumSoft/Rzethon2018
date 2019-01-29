import axios from "axios";
import environment from "../environment/environment";

export default class AuthorService {
  static async getBooks() {
    try {
      return await axios.get(`${environment.config.apiUrl}/actions/book`);
    } catch (error) {
      console.error(error);
    }
  }
  static async getReaderData() {
    try {
      return await axios.get(`${environment.config.apiUrl}/author/data`);
    } catch (error) {
      console.error(error);
    }
  }
  static async addBook(data) {
    try {
      return await fetch(`${environment.config.apiUrl}/actions/book`, {
        method: "POST",
        body: data
      });
    } catch (error) {
      console.error(error);
    }
  }
  static async deleteBook(id) {
    try {
      return await axios.delete(`${environment.config.apiUrl}/actions/book`, {
        data: {
          id: id
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  static async editBook(book) {
    try {
      return await axios.patch(`${environment.config.apiUrl}/actions/book`, {
        data: {
          id: book._id,
          data: {
            title: book.title,
            author: book.author,
            desc: book.desc
          }
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
}
