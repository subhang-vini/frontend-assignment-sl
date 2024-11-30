import { renderHook, act, waitFor } from "@testing-library/react";
import { vi, expect, describe, afterEach, it } from "vitest";
import axios from "axios";
import usePaginatedDataFetch from "@hooks/usePaginatedDataFetch";

// Mock axios
vi.mock("axios");

describe("usePaginatedDataFetch", () => {
  const mockData = Array.from({ length: 50 }, (_, index) => ({
    id: index,
    name: `Item ${index + 1}`,
  }));
  const url = "https://api.example.com/data";
  const pageSize = 10;

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch data successfully and set the correct state", async () => {
    // Mocking the Axios GET request
    axios.get.mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(() =>
      usePaginatedDataFetch({ url, pageSize })
    );

    // Initial state
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBeNull();

    // Trigger fetch
    act(() => {
      result.current.fetchData();
    });

    // Wait for loading to be false and data to be updated
    await waitFor(() => {
      return result.current.loading === false && result.current.data.length > 0;
    });

    // After fetching
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(mockData.slice(0, pageSize)); // First page data
    expect(result.current.error).toBeNull();
    expect(result.current.isLastPage).toBe(false); // Should not be the last page yet
  });

  it("should handle errors properly", async () => {
    // Mocking the Axios GET request to throw an error
    axios.get.mockRejectedValueOnce(new Error("Something went wrong"));

    const { result } = renderHook(() =>
      usePaginatedDataFetch({ url, pageSize })
    );

    // Trigger fetch
    act(() => {
      result.current.fetchData();
    });

    // Wait for error state to be set
    await waitFor(() => {
      return result.current.loading === false && result.current.error !== null;
    });

    // After error occurs
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toEqual(new Error("Something went wrong"));
  });

  it("should paginate correctly", async () => {
    // Mocking the Axios GET request
    axios.get.mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(() =>
      usePaginatedDataFetch({ url, pageSize })
    );

    // Trigger the fetch to load data
    act(() => {
      result.current.fetchData();
    });

    // Wait for data to be fetched
    await waitFor(() => {
      return result.current.data.length > 0;
    });

    // Initially, we expect data to be from the first page
    expect(result.current.data).toEqual(mockData.slice(0, pageSize));

    // Update page to 2
    act(() => {
      result.current.updatePage(2);
    });

    // Wait for data to be updated after page change
    await waitFor(() => {
      return (
        result.current.data.length > 0 &&
        result.current.data[0].name === "Item 11"
      );
    });

    // Now data should be the second page
    expect(result.current.data).toEqual(mockData.slice(pageSize, pageSize * 2));

    // Update page to 3
    act(() => {
      result.current.updatePage(3);
    });

    // Wait for data to be updated after page change
    await waitFor(() => {
      return (
        result.current.data.length > 0 &&
        result.current.data[0].name === "Item 21"
      );
    });

    // Now data should be the third page
    expect(result.current.data).toEqual(
      mockData.slice(pageSize * 2, pageSize * 3)
    );
  });

  it("should correctly detect if it is the last page", async () => {
    // Mocking the Axios GET request
    axios.get.mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(() =>
      usePaginatedDataFetch({ url, pageSize })
    );

    // Trigger fetch to load data
    act(() => {
      result.current.fetchData();
    });

    // Wait for data to be fetched
    await waitFor(() => {
      return result.current.data.length > 0;
    });

    // Initially, it should not be the last page
    expect(result.current.isLastPage).toBe(false);

    // Update page to the last one (5th page in this case)
    act(() => {
      result.current.updatePage(5);
    });

    // Wait for data to be updated after page change
    await waitFor(() => {
      return (
        result.current.data.length > 0 &&
        result.current.data[0].name === "Item 41"
      );
    });

    // Now data should be from the 5th page
    expect(result.current.data).toEqual(
      mockData.slice(pageSize * 4, mockData.length)
    );

    // After the last page, `isLastPage` should be true
    expect(result.current.isLastPage).toBe(true);
  });
});
