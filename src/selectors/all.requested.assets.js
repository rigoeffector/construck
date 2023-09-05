export function formatRequestedAssetsInfo(state) {
    if (!Array.isArray(state)) return state;
    const data = state.flatMap((asset) => {
        if (!Array.isArray(asset.assets)) return []; // Skip assets without requests
        debugger;
        return asset.assets.map((request, i) => ({
            id: asset.id,
            assetName: request.assetName,
            createdAt: request.createdAt,
            updatedAt: request.updatedAt,
            category: request.category,
            from: asset.startDate,
            to: asset.endDate,
            purpose: asset.purpose,
            assetType: request.assetType,
            customerName: request.customerName,
            customerId: request.customerId,
            assetStatus: request.assetStatus,
            status: asset.status,
            condition: request.condition,
            plateNumber: request.plateNumber,
            make: request.make,
            manufacturedDate: request.manufacturedDate,
            tinNumber: asset.tinNumber,
            email: asset.email,
            requestorType: asset.requestorType,
            phoneNumber: asset.phoneNumber,
            requestedBy: asset.requestedBy,
            idNumber: asset.idNumber,
            invoice: asset.invoice
        }));
    });

    return {
        ...state,
        data
    };
}
