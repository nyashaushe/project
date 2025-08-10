import { fetchFeatures } from "../features";
import { getStaticData } from "../../clientDataService";

jest.mock("../../clientDataService");
const mockGetStaticData = getStaticData as jest.MockedFunction<
  typeof getStaticData
>;

describe("Features Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch features from static data", async () => {
    const mockData = {
      data: [
        {
          id: 1,
          title: "Custom Web Development",
          description: "Build scalable applications.",
          icon: "Code",
        },
      ],
      meta: { pagination: { total: 1, page: 1, pageSize: 10 } },
    };

    mockGetStaticData.mockResolvedValue(mockData);
    const result = await fetchFeatures();

    expect(mockGetStaticData).toHaveBeenCalledWith("features");
    expect(result).toEqual(mockData);
  });
});
