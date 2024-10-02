const HomeHero = require('../model/homeHero');


exports.getHeroes = async (req, res) => { 
  try {
    const heroes = await HomeHero.find().sort({ date: -1 });

    res.json({
      success: true,
      message: 'Heroes fetched successfully',
      numberOfHeroes: heroes.length,
      data: heroes[0],
    }
      );
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
}


exports.addHeroes = async (req, res) => { 
  try {
    const { title, description, image_one, image_two, image_three } = req.body;

    const newHero = new HomeHero({
      title,
      description,
      image_one,
      image_two,
      image_three,
    });

    const savedHero = await newHero.save();

    res.json({
      success: true,
      message: 'Hero added successfully',
      data: savedHero,
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
}


exports.updateHeroes = async (req, res) => { 
  try {
    const { id } = req.params;
    const { title, description, image_one, image_two, image_three } = req.body;

    const updatedHero = await HomeHero.findByIdAndUpdate(id, {
      title,
      description,
      image_one,
      image_two,
      image_three,
    }, { new: true });

    if (!updatedHero) {
      return res.status(404).json({
        success: false,
        message: 'Hero not found'
      });
    }

    res.json({
      success: true,
      message: 'Hero updated successfully',
      data: updatedHero,
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
}
