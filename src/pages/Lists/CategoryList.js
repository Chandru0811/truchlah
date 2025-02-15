import { bookingApi } from "../../config/URL";

const fetchAllCategorysWithIds = async () => {
  try {
    const response = await bookingApi.get("getAllHouseShiftingList");
    return response.data;
  } catch (error) {
    console.error("Error fetching Categorys data:", error);
    throw error;
  }
};

export default fetchAllCategorysWithIds;
