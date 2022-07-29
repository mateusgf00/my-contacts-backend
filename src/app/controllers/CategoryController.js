const CategoryRepository = require("../repositories/CategoryRepository");

class CategoryController {
  async index(request, response) {
    const categories = await CategoryRepository.findAll();

    response.send(categories);
    
  }

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: "Name is required" });
    }

    const category = await CategoryRepository.create({name});

    response.json(category);
  }
}

module.exports = new CategoryController();