export function formatRequestedAssetsInfo(state) {
    if (!Array.isArray(state)) return state;
    const data = state.flatMap((asset) => {
      if (!Array.isArray(asset.assetRequests)) return []; // Skip assets without requests
  
      return asset.assetRequests.map((request) => ({
        assetName: request.assetName,
        createdAt: request.createdAt,
        updatedAt: request.updatedAt,
        name: asset.requestedBy,
        category: asset.requestorType,
        requestedBy: asset.phoneNumber,
        from: asset.startDate,
        to: asset.endDate,
        purpose: asset.purpose,
      }));
    });
  
    return {
      ...state,
      data,
    };
  }
  