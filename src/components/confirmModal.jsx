

export function ConfirmForm() {
    return (
        <div className="confirm-block">
            <div className="layout">
            </div>
            <div className="form-confirm">
                <div className="form-header">
                    <h2>Xóa sản phẩm</h2>
                    <div>&#10540;</div>
                </div>
                <div className="form-content">
                    <p>Xác nhận xóa sản phẩm  ?</p>
                    <div className="btn-block">
                        <button className="add-btn">Xóa</button>
                        <button className="edit-btn">Hủy</button>
                    </div>
                </div>
            </div>
        </div>
    )
}