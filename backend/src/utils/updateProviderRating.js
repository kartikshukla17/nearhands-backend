// Helper function to update provider's average rating
const { Rating, ServiceProvider } = require('../models');

async function updateProviderRating(providerId) {
  try {
    const ratings = await Rating.findAll({
      where: { reviewee_id: providerId, is_deleted: false },
      attributes: ['rating'],
    });

    if (ratings.length === 0) {
      await ServiceProvider.update(
        { rating: 0 },
        { where: { id: providerId } }
      );
      return;
    }

    const totalRating = ratings.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = totalRating / ratings.length;

    await ServiceProvider.update(
      { rating: averageRating },
      { where: { id: providerId } }
    );
  } catch (error) {
    console.error('Error updating provider rating:', error);
  }
}

module.exports = updateProviderRating;