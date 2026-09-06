import api from "../api";

export const approveTaskCompletion = async (completionId) => {
  const res = await api.post(
    `/parents/me/task-completions/${completionId}/approve`
  );
  return res.data;
};

export const rejectTaskCompletion = async (completionId) => {
  const res = await api.post(
    `/parents/me/task-completions/${completionId}/reject`
  );
  return res.data;
};

export const fulfillRewardPurchase = async (purchaseId) => {
  const res = await api.post(`/parents/me/reward-purchases/${purchaseId}/fulfill`);
  return res.data;
};

export const deleteTask = async (taskId) => {
  const res = await api.delete(`/parents/me/tasks/${taskId}`);
  return res.data;
};

export const deleteReward = async (rewardId) => {
  const res = await api.delete(`/parents/me/rewards/${rewardId}`);
  return res.data;
};