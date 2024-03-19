import apiInstance from "./config";
import { api } from "./http";

vi.mock("./config");

describe("[Infrastructure]: HTTP", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call axios.get with the correct URL and config", async () => {
    const testUrl = "/test";
    const testConfig = { headers: { "Test-Header": "TestValue" } };

    vi.mocked(apiInstance, true).get.mockResolvedValue("test response");
    const response = await api.get(testUrl, testConfig);

    expect(apiInstance.get).toHaveBeenCalledWith(testUrl, testConfig);
    expect(response).toEqual("test response");
  });

  it("should call axios.post with the correct URL, data and config", async () => {
    const testUrl = "/test";
    const testConfig = { headers: { "Test-Header": "TestValue" } };
    const data = { id: 1, value: "value" };

    vi.mocked(apiInstance, true).post.mockResolvedValue("test response");
    const response = await api.post(testUrl, data, testConfig);

    expect(apiInstance.post).toHaveBeenCalledWith(testUrl, data, testConfig);
    expect(response).toEqual("test response");
  });
});
