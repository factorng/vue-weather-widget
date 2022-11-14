export async function getCityWeaterById(id) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?id=${id}&units=metric&appid=${process.env.VUE_APP_API_KEY}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}
