import config from "./config";
export const deleteComment = async (commentId) => {
  const url = `${config.API_BASE_URL}/api/comments/${commentId}/`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return {
      success: true,
      message: "Comment deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting comment:", error);
    return {
      success: false,
      message: error.message,
    };
  }
};

export const updataComment = async (commentId, updatedData) => {
  const url = `${config.API_BASE_URL}/api/comments/${commentId}/`;
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return {
      success: true,
      message: "Comment updated successfully",
      data: data,
    };
  } catch (error) {
    console.error("Error updating comment: ", error);
    return {
      success: false,
      message: error.message,
    };
  }
};
