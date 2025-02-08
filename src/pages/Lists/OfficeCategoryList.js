import { bookingApi } from "../../config/URL";

const OfficeCategoryList = async() => {
    try {
        const response = await bookingApi.get("getAllCommercialShiftingList");
        return response.data;
      } catch (error) {
        console.error("Error fetching Categorys data:", error);
        throw error;
      }
}

export default OfficeCategoryList
