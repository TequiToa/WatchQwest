import watchlistModel from "../models/watchlistModel.js";

const average = (array) => array.reduce((a, b) => a + b) / array.length;

export const updateList = async (req, res) => {
  try {
    const { listId, listData } = req.body;
    console.log(listId, listData);
    //calcul stats
    const listStat = { days: 0, scores: 0, totalAnime: listData.length };
    let scores = 0;

    listData.forEach((elem) => {
      listStat.days += Number((elem.userData.progress * 24) / 60 / 24);
      scores = scores + Number(elem.userData.score);
    });
    console.log(scores);
    listStat.scores = Math.round((scores / listData.length) * 100) / 100;

    listStat.days = Math.round(listStat.days * 100) / 100;
    const doc = await watchlistModel.findByIdAndUpdate(
      { _id: listId },
      { animeList: listData, stats: listStat },
      { new: true }
    );
    console.log(doc);
    res.status(201).json({
      status: "Success",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: "Error",
      error: error.message,
    });
  }
};

export const getList = async (req, res) => {
  try {
    const { listId } = req.query;

    //? liste trouvée
    const { stats, animeList } = await watchlistModel.findById(listId);

    console.log();

    res.status(201).json({
      status: "Success",
      stats,
      animeList,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: "Error",
      error: error.message,
    });
  }
};
